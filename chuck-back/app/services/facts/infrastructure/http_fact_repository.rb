# frozen_string_literal: true

module Facts
  module Infrastructure
    # HttpFactRepository: Repository to search for facts through http api
    class HttpFactRepository
      def initialize(http_client)
        @client = http_client
      end

      def random
        response = @client.get('random')
        return response.body if ok?(response)

        raise Facts::Domain::FactNotFound
      end

      def by_category(category)
        response = @client.get('random', { category: category })
        return response.body if ok?(response) && !blank?(response)

        raise Facts::Domain::FactNotFound
      end

      def by_keyword(keyword:, offset:, limit:)
        response = @client.get('search', { query: keyword })
        if ok?(response) && !empty?(response)
          response.body['result'] = paginate(array: response.body['result'], offset: offset, limit: limit)
          return response.body
        end

        raise Facts::Domain::FactNotFound
      end

      private

      def ok?(response)
        response.status == 200
      end

      def blank?(response)
        response.body.length.zero?
      end

      def empty?(response)
        blank?(response) ||
          response.body['total'].nil? ||
          response.body['total'].zero?
      end

      def paginate(array:, offset:, limit:)
        return array[offset * limit, limit] unless above_limits?(length: array.length, offset: offset, limit: limit)

        raise Facts::Domain::FactNotFound
      end

      def above_limits?(length:, offset:, limit:)
        offset * limit > length
      end
    end
  end
end
