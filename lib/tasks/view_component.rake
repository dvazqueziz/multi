# frozen_string_literal: true

namespace :view_component do
  namespace :stimulus_manifest do
    task display: :environment do
      puts Stimulus::Manifest.generate_from(Rails.root.join('app/components'))
    end

    task update: :environment do
      manifest =
        Stimulus::Manifest.generate_from(Rails.root.join('app/components'))

      File.open(Rails.root.join('app/components/index.js'), 'w+') do |index|
        index.puts '// This file is auto-generated by ./bin/rails view_component:stimulus_manifest:update'
        index.puts '// Run that command whenever you add a new controller in ViewComponent'
        index.puts
        index.puts %(import { application } from "../javascript/controllers/application")
        index.puts manifest
      end
    end
  end
end

if Rake::Task.task_defined?('stimulus:manifest:update')
  Rake::Task['stimulus:manifest:update'].enhance do
    Rake::Task['view_component:stimulus_manifest:update'].invoke
  end
end