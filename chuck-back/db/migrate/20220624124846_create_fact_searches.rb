# frozen_string_literal: true

# CreateFactSearches fact_searches table creation
class CreateFactSearches < ActiveRecord::Migration[7.0]
  def change
    create_table :fact_searches, id: :uuid do |t|
      t.string :search_by
      t.text :response
      t.string :parameters

      t.timestamps
    end
  end
end
