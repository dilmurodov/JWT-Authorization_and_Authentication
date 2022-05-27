
class TokenDto {

    constructor(model){
        this.email = model.email;
        this.id = model._id;
        this.isActivated = model.isActivated;
    }
}

module.exports = TokenDto;