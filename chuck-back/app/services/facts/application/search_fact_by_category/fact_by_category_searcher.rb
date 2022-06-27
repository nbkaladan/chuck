# frozen_string_literal: true

module Facts
  module Application
    module SearchFactByCategory
      # FactByCategorySearcher: Search fact by category
      class FactByCategorySearcher
        include Wisper::Publisher

        def initialize(repository)
          @repository = repository
        end

        def search(category)
          raise Domain::CategoryNotValid unless valid(category)

          response = @repository.by_category(category)
          id = SecureRandom.uuid

          publish('fact_by_category_searched', {
            id: id,
            category: category,
            response: response
          })

          SearchFactResponse.new(id, response, 1, 1)
        end

        private

        def valid(category)
          string(category) && !category.empty?
        end

        def string(category)
          category.instance_of?(String)
        end
      end
    end
  end
end
