Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  scope '/api', defaults: { format: :json } do
    get '/v1/categories', to: 'categories/categories#index'
    get '/v1/facts/random', to: 'facts/random_fact#index'
    get '/v1/facts/by_category/:category', to: 'facts/fact_by_category#index'
    get '/v1/facts', to: 'facts/fact_by_keyword#index'
    post '/v1/facts/:id/notify', to: 'facts/send_fact_search_result_by_email#index'
  end
end
