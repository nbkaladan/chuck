# frozen_string_literal: true

module Facts
  module Domain
    # KeywordNotValid: KeywordNotValid DomainError
    class KeywordNotValid < Shared::Domain::DomainError
      def message
        'Provided keyword is not valid'
      end
    end
  end
end
