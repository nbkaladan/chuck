# frozen_string_literal: true

module Facts
  # FactByCategoryController: Endpoint to look for facts by categories
  class FactByCategoryController < ApplicationController
    def index
      response = Application::SearchFactByCategory::FactByCategorySearcherFactory.new
                                                                                 .fact_by_category_searcher
                                                                                 .search(params[:category])
      render json: response
    rescue Domain::FactNotFound
      head 404
    rescue
      head 500
    end
  end
end
