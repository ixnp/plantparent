class PlantSerializer < ActiveModel::Serializer
  attributes :id, :name, :img, :lastwatered, :frequency
end
