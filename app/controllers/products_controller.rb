class ProductsController < ApplicationController
    def index
      @products = Product.limit(8)
    end
   
    def load_more
      offset = params[:offset].to_i
      @products = Product.offset(offset).limit(8)
   
      respond_to do |format|
        format.json { render json: @products.map { |product| product_data(product) } }
      end
    end
   
    private
   
    def product_data(product)
      {
        id: product.upid,
        brand: product.brand,
        name: product.name,
        image_url: "https://n-img3.junaroad.com/uiproducts/#{product.upid}/zoom_0-#{product.fileidn}.jpg",
        selling_price: product.selling_price,
        price: product.price
      }
    end
  
  end