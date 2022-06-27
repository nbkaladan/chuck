# frozen_string_literal: true

module Categories
  # CategoriesController: Endpoint to get all categories
  class CategoriesController < ApplicationController
    def index
      response = Application::FindCategories::CategoriesFinderFactory.new.categories_finder.find
      render json: response
    rescue Domain::CategoriesNotFound
      head 404
    rescue
      head 500
    end
  end
end
