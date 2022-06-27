# frozen_string_literal: true

module Facts
  module Domain
    # FactSearchNotFound: FactSearchNotFound DomainError
    class FactSearchNotFound < Shared::Domain::DomainError
      def message
        'Unable to find any fact search'
      end
    end
  end
end
