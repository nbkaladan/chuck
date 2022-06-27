# frozen_string_literal: true

module Categories
  module Domain
    # CategoriesNotFound: CategoriesNotFound DomainError
    class CategoriesNotFound < Shared::Domain::DomainError
      def message
        'Unable to find any category'
      end
    end
  end
end
