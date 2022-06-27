# frozen_string_literal: true

module Facts
  # RandomFactController: Endpoint to get a random fact
  class SendFactSearchResultByEmailController < ApplicationController
    skip_before_action :verify_authenticity_token
    def index
      Application::NotifyFactSearch::FactSearchNotifierFactory.new.fact_search_notifier.notify(params[:id], params[:to])
      head 200
    rescue Domain::FactNotFound
      head 404
    rescue
      head 500
    end
  end
end
