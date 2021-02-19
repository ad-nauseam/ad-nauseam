const BaseStructure = require('./BaseStructure')

class User extends BaseStructure {

  constructor(client, user) {
    super(client);

    this.raw = user
  
    this.id = user.data.id;

    this.name = user.data.name;

    this.username = user.data.username

    this.description = user.data.description

    this.createdAt = user.data.created_at

    this.timestamp = new Date(this.createdAt).getTime()

    this.verified = Boolean(user.data.verified)

    this.icon = user.data.profile_image_url

    this.protected = user.data.protected

    this.url = user.data.url

    this.metrics = user.data.public_metrics
  }
}

module.exports = User;
