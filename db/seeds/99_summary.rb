# Summary of all seeds

discard_models = %w[ActiveRecord::SchemaMigration ActiveRecord::InternalMetadata ApplicationRecord HABTM_Roles Globalize::ActiveRecord::Translation]
models = ActiveRecord::Base.descendants
results = {}.tap do |result|
  models.each do |model|
    next if discard_models.include?(model.name)
    result[model.name] = model.count
  end
end

puts
puts
puts 'Summary of all seeds'
puts '--------------------'
results.each do |k, v|
  puts "#{k}: #{v}"
end