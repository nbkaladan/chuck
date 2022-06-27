# frozen_string_literal: true

module Facts
  # FactByKeywordController: Endpoint to look for facts by keyword
  class FactByKeywordController < ApplicationController
    def index
      response = Application::SearchFactByKeyword::FactByKeywordSearcherFactory.new
                                                                               .fact_by_keyword_searcher
                                                                               .search(keyword: params[:keyword],
                                                                                       offset: params[:offset],
                                                                                       limit: params[:limit])
      render json: response
    rescue Domain::FactNotFound
      head 404
    rescue Domain::KeywordNotValid
      head 400
    rescue
      head 500
    end
  end
end
