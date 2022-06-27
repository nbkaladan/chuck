# frozen_string_literal: true

module Facts
  module Domain
    # CategoryNotValid: CategoryNotValid DomainError
    class CategoryNotValid < Shared::Domain::DomainError
      def message
        'Provided category is not valid'
      end
    end
  end
end
