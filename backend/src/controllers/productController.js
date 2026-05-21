import supabase from "../config/supabaseClient.js";


// GET ALL PRODUCTS
export const getAllProducts = async (req, res) => {

  try {

    const { data, error } = await supabase
      .from("products")
      .select(`
        *,
        categories (
          id,
          name,
          slug
        )
      `);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.status(200).json({
      success: true,
      products: data,
    });

  } catch (error) {

    console.error("Get Products Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};



// GET SINGLE PRODUCT
export const getSingleProduct = async (req, res) => {

  try {

    const { slug } = req.params;

    const { data, error } = await supabase
      .from("products")
      .select(`
        *,
        categories (
          id,
          name,
          slug
        )
      `)
      .eq("slug", slug)
      .single();

    if (error) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product: data,
    });

  } catch (error) {

    console.error("Single Product Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};




// GET ALL CATEGORIES
export const getAllCategories = async (req, res) => {

  try {

    const { data, error } = await supabase
      .from("categories")
      .select("*");

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.status(200).json({
      success: true,
      categories: data,
    });

  } catch (error) {

    console.error("Categories Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};