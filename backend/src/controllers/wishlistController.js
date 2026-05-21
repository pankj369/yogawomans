import supabase from "../config/supabaseClient.js";



// GET WISHLIST
export const getWishlistItems = async (
  req,
  res
) => {

  try {

    const userId = req.user.id;

    const { data, error } = await supabase
      .from("wishlists")
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

    if (error) throw error;

    return res.status(200).json({
      success: true,
      wishlist: data,
    });

  } catch (error) {

    console.error(
      "Fetch wishlist error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch wishlist",
    });
  }
};



// ADD TO WISHLIST
export const addToWishlist = async (
  req,
  res
) => {

  try {

    const userId = req.user.id;

    const { product_id } = req.body;



    const { data: existingItem } =
      await supabase
        .from("wishlists")
        .select("*")
        .eq("user_id", userId)
        .eq("product_id", product_id)
        .maybeSingle();



    if (existingItem) {

      return res.status(200).json({
        success: true,
        message:
          "Already in wishlist",
      });
    }



    const { data, error } =
      await supabase
        .from("wishlists")
        .insert({
          user_id: userId,
          product_id,
        })
        .select()
        .single();

    if (error) throw error;



    return res.status(201).json({
      success: true,
      message:
        "Added to wishlist",
      wishlistItem: data,
    });

  } catch (error) {

    console.error(
      "Add wishlist error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to add wishlist item",
    });
  }
};



// REMOVE WISHLIST ITEM
export const removeWishlistItem =
  async (req, res) => {

    try {

      const { id } = req.params;

      const { error } =
        await supabase
          .from("wishlists")
          .delete()
          .eq("id", id);

      if (error) throw error;

      return res.status(200).json({
        success: true,
        message:
          "Wishlist item removed",
      });

    } catch (error) {

      console.error(
        "Remove wishlist error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to remove wishlist item",
      });
    }
  };