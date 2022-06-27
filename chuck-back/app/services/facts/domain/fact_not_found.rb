# frozen_string_literal: true

module Facts
  module Domain
    # FactNotFound: FactNotFound DomainError
    class FactNotFound < Shared::Domain::DomainError
      def message
        'Unable to find any fact'
      end
    end
  end
end
