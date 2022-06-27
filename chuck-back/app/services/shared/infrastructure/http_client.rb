# frozen_string_literal: true

module Shared
  module Infrastructure
    # HttpClient: Faraday implementation for an http client
    class HttpClient
      def self.client(endpoint)
        Faraday.new(endpoint) do |config|
          config.request :json
          config.response :json
        end
      end
    end
  end
end
