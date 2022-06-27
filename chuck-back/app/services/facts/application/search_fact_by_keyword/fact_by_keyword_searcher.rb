# frozen_string_literal: true

module Facts
  module Application
    module SearchFactByKeyword
      # FactByKeywordSearcher: Search fact by keyword
      class FactByKeywordSearcher
        include Wisper::Publisher

        def initialize(repository)
          @repository = repository
        end

        def search(keyword:, offset:, limit:)
          offset = sanitize(value: offset, default: 0)
          limit = sanitize(value: limit, default: 10)
          raise Domain::KeywordNotValid unless valid?(keyword) && positive_number?(offset) && positive_number?(limit)

          response = @repository.by_keyword(keyword: keyword, offset: offset, limit: limit)
          id = SecureRandom.uuid

          publish('fact_by_keyword_searched', {
            id: id,
            keyword: keyword,
            offset: offset,
            limit: limit,
            response: response['result']
          })

          SearchFactResponse.new(id, response['result'], response['total'], offset)
        end

        private

        def valid?(keyword)
          string?(keyword) && !keyword.empty?
        end

        def string?(keyword)
          keyword.instance_of?(String)
        end

        def positive_number?(number)
          number.is_a?(Integer) && number >= 0
        end

        def sanitize(value:, default: 0)
          return value if value.is_a?(Integer)

          return value.to_i if value.respond_to?(:match) && value.match(/^\d+$/)

          default
        end
      end
    end
  end
end
