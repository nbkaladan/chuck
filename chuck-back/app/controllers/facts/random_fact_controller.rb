# frozen_string_literal: true

module Facts
  # RandomFactController: Endpoint to get a random fact
  class RandomFactController < ApplicationController
    def index
      response = Application::FindRandomFact::RandomFactFinderFactory.new.random_fact_finder.find
      render json: response
    rescue Domain::FactNotFound
      head 404
    rescue
      head 500
    end
  end
end
