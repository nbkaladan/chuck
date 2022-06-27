# frozen_string_literal: true

module Facts
  module Application
    # SearchFactResponse: Response object for all search fact use cases
    class SearchFactResponse
      def initialize(id, response, total, current)
        @id = id
        @response = response
        @total = total
        @current = current;
      end
    end
  end
end
