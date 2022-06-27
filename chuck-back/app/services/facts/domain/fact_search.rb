# frozen_string_literal: true

module Facts
  module Domain
    # FactSearch domain model
    class FactSearch
      attr :id, :search_by, :response, :parameters

      def initialize(id, search_by, response, parameters)
        @id = id
        @search_by = search_by
        @response = response
        @parameters = parameters
      end
    end
  end
end
