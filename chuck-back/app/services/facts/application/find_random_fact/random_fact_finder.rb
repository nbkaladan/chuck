# frozen_string_literal: true

module Facts
  module Application
    module FindRandomFact
      # RandomFactFinder: Random fact finder use case
      class RandomFactFinder
        include Wisper::Publisher

        def initialize(repository)
          @repository = repository
        end

        def find
          response = @repository.random
          id = SecureRandom.uuid

          publish('fact_random_searched', {
            id: id,
            response: response
          })

          SearchFactResponse.new(id, response, 1, 1)
        end
      end
    end
  end
end
