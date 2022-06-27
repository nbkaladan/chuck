# frozen_string_literal: true

module Categories
  module Infrastructure
    # HttpCategoriesRepository: Repository to search for categories through http api
    class HttpCategoriesRepository
      def initialize(http_client)
        @client = http_client
      end

      def all
        response = @client.get('categories')
        return response.body if response_ok(response)

        raise Categories::Domain::CategoriesNotFound
      end

      private

      def response_ok(response)
        response.status == 200
      end
    end
  end
end
