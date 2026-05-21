import supabase from "../config/supabaseClient.js";



// GET USER CART
export const getCartItems = async (req, res) => {

  try {

    const userId = req.user.id;

    const { data, error } = await supabase
      .from("carts")
      .select(`
        *,
        products (
          id,
          name,
          slug,
          price,
          image_url,
          stock
        )
      `)
      .eq("user_id", userId);

    if (error) {
      throw error;
    }

    return res.status(200).json({
      success: true,
      cart: data,
    });

  } catch (error) {

    console.error("Get cart error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch cart",
    });
  }
};



// ADD TO CART
export const addToCart = async (req, res) => {

  try {

    const userId = req.user.id;

    const {
      product_id,
      quantity = 1,
    } = req.body;



    const { data: existingItem, error: existingError } = await supabase
  .from("carts")
  .select("*")
  .eq("user_id", userId)
  .eq("product_id", product_id)
  .maybeSingle();



    if (existingItem) {

      const { data, error } = await supabase
        .from("carts")
        .update({
          quantity:
            existingItem.quantity + quantity,

          updated_at: new Date(),
        })
        .eq("id", existingItem.id)
        .select()
        .single();

      if (error) throw error;

      return res.status(200).json({
        success: true,
        message: "Cart updated",
        cartItem: data,
      });
    }



    const { data, error } = await supabase
      .from("carts")
      .insert({
        user_id: userId,
        product_id,
        quantity,
      })
      .select()
      .single();

    if (error) throw error;



    return res.status(201).json({
      success: true,
      message: "Added to cart",
      cartItem: data,
    });

  } catch (error) {

    console.error("Add cart error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to add to cart",
    });
  }
};



// UPDATE CART QUANTITY
export const updateCartItem = async (req, res) => {

  try {

    const { id } = req.params;

    const { quantity } = req.body;

    if (quantity < 1) {
  return res.status(400).json({
    success: false,
    message: "Quantity must be at least 1",
  });
}

    const { data, error } = await supabase
      .from("carts")
      .update({
        quantity,
        updated_at: new Date(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return res.status(200).json({
      success: true,
      message: "Cart updated",
      cartItem: data,
    });

  } catch (error) {

    console.error("Update cart error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update cart",
    });
  }
};



// REMOVE CART ITEM
export const removeCartItem = async (req, res) => {

  try {

    const { id } = req.params;

    const { error } = await supabase
      .from("carts")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return res.status(200).json({
      success: true,
      message: "Item removed from cart",
    });

  } catch (error) {

    console.error("Remove cart error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to remove cart item",
    });
  }
};