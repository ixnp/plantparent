class PlantSerializer < ActiveModel::Serializer
  attributes :id, :name, :img, :lastwatered, :frequency, :user_info
  def user_info
        if self.object.user
          { id: self.object.user.id,
            name: self.object.user.username,
            bio: self.object.user.bio}
        else
          { id: 1,
            name: "soundarya",
            bio: "Testing out some things"}
        end
    end
end
