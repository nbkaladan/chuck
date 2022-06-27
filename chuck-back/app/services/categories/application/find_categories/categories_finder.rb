# frozen_string_literal: true

module Categories
  module Application
    module FindCategories
      # CategoriesFinder: Resolve find categories use case
      class CategoriesFinder
        def initialize(repository)
          @repository = repository
        end

        def find
          @repository.all
        end
      end
    end
  end
end
