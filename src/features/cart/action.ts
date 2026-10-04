"use server"

import { createClient } from "@/lib/supabase/server"
// import { CartItemTyp } from "../type";
import { generatePublicCode } from "./lib/generatePublicCode";
import { CartType } from "@/src/types/types";

interface FormValue{
    fullName: string;
    phone: string;
    notes?: string;
    pickupDate: Date;
    pickupTimeSlot: string;
}

// interface ItemValue{
//     // id: number;
//     // name: string;
//     // price: number;
//     // quantity: number;
//     // totalPrice:number
//     items:CartItemTyp
// }


export async function submitOrder(formData:FormValue,items:CartType[],totalPrice:number){
    const supabase=await createClient()
    

    if (!items || items.length===0){ 
        return { success: false, error: 'Your cart is empty.' };
    }


    // 2. Format pickup date (YYYY-MM-DD)
    const pickup_date = formData.pickupDate.toISOString().split('T')[0];

    // 3. Combine user notes with selected time slot
    const formattedNotes = [
        `Time Slot: ${formData.pickupTimeSlot}`,
        formData.notes ? `User Notes: ${formData.notes}` : null,
    ]
        .filter(Boolean)
        .join(' | ');

    
    const public_code = generatePublicCode();

    const { data: order, error: orderError } =await supabase
    .from("orders")
    .insert({
      public_code,
      customer_name: formData.fullName,
      customer_phone: String(formData.phone),
      pickup_date,
      notes: formattedNotes,
      estimated_total:totalPrice,
      status: 'draft',
    })
    .select('id, public_code')
    .single();

    if (orderError || !order) {
        console.error('Error inserting order:', orderError?.message);
        return { success: false, error: 'Failed to create order.' };
    }

    // Insert Items
    const orderItemsData = items.map((item) => ({
        order_id: order.id,
        product_id: item.id,
        product_name: item.name,
        unit_price: item.price,
        quantity: item.quantity,
    }));

    const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItemsData);

    if (itemsError) {
        console.error('Error inserting order items:', itemsError.message);
        // Rollback order header if items fail to insert
        await supabase.from('orders').delete().eq('id', order.id);
        return { success: false, error: 'Failed to add items to order.' };
    }

    return {
        success: true,
        publicCode: order.public_code,
    };
}