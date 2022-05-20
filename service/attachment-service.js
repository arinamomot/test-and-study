const userService = require("./user-service");
const AttachmentModel = require("../models/attachment-model");
const UserModel = require("../models/user-model");
const TestModel = require("../models/test-model");
const UserDto = require("../dtos/user-dto");
const TestDto = require("../dtos/test-dto");
const AttachmentDto = require("../dtos/attachment-dto");
const fs = require("fs");

class AttachmentService {
  async uploadAttachment(file, refreshToken) {
    const user = await userService.getAccountInfo(refreshToken);
    const userId = user.user.id;

    const obj = {
      img: file.filename,
      user: userId,
    };

    await AttachmentModel.create(obj);
    return { message: "Avatar successfully uploaded." };
  }

  async uploadAvatar(file, refreshToken) {
    const user = await userService.getAccountInfo(refreshToken);
    const userId = user.user.id;

    const obj = {
      title: "avatar",
      img: file.filename,
      user: userId,
    };

    // delete old avatar
    const userDB = await UserModel.findById(userId);
    const userDTO = new UserDto(userDB);

    if (userDTO.avatar) {
      const oldAvatar = await AttachmentModel.findById(userDTO.avatar);
      const oldAvatarDto = new AttachmentDto(oldAvatar);

      fs.unlink(`../client/public/uploads/${oldAvatarDto.img}`, (err) => {
        if (err) {
          console.error(err);
          return;
        }
        //file deleted
      });

      await AttachmentModel.deleteOne(userDTO.avatar);
    }
    //

    const avatar = await AttachmentModel.create(obj);

    await UserModel.findByIdAndUpdate(userId, {
      avatar: avatar._id,
    });

    const attachmentDto = new AttachmentDto(avatar);

    const newUser = await UserModel.findById(userId);
    const userDto = new UserDto(newUser);

    return {
      newUser: userDto,
      avatar: attachmentDto,
      message: "Avatar successfully uploaded.",
    };
  }

  async uploadTestPhoto(file, refreshToken, testId) {
    const user = await userService.getAccountInfo(refreshToken);
    const userId = user.user.id;

    const testDB = await TestModel.findById(testId);
    const testDto = new TestDto(testDB);

    const obj = {
      title: "testPhoto",
      img: file.filename,
      user: userId,
      test: testDto._id,
    };

    //delete old test photo
    if (testDto.image) {
      const oldImage = await AttachmentModel.findOne({ img: testDto.image });
      const oldImageDto = new AttachmentDto(oldImage);

      fs.unlink(`../client/public/uploads/${oldImageDto.img}`, (err) => {
        if (err) {
          console.error(err);
          return;
        }
        //file deleted
      });

      await AttachmentModel.deleteOne({ img: testDto.image });
    }
    //

    const testImage = await AttachmentModel.create(obj);

    await TestModel.findByIdAndUpdate(testId, {
      image: testImage.img,
    });

    const attachmentDto = new AttachmentDto(testImage);

    return {
      image: attachmentDto.img,
      message: "Test image successfully uploaded.",
    };
  }

  async getAvatar(refreshToken) {
    const userId = (await userService.getAccountInfo(refreshToken)).user.id;
    const user = await UserModel.findById(userId);
    const userDTO = new UserDto(user);

    if (userDTO.avatar) {
      const avatarId = userDTO.avatar;

      const attachment = await AttachmentModel.findById(avatarId);
      const attachmentDto = new AttachmentDto(attachment);
      const avatar = attachmentDto.img;
      return { avatar: avatar };
    }

    return { avatar: "" };
  }

  async deleteAll() {
    const attachments = await AttachmentModel.find();
    for (const att of attachments) {
      const attDto = new AttachmentDto(att);

      const allUsers = await UserModel.find();

      for (const user of allUsers) {
        const userDTO = new UserDto(user);
        if (userDTO.avatar) {
          await UserModel.findByIdAndUpdate(userDTO.id, {
            // Delete ref id in Schema
            $unset: { avatar: "" },
          });
        }
      }

      const alltests = await TestModel.find();

      for (const test of alltests) {
        const testDto = new TestDto(test);
        if (test.image) {
          await TestModel.findByIdAndUpdate(testDto._id, {
            // Delete ref id in Schema
            $unset: { image: "" },
          });
        }
      }

      fs.unlink(`./client/public/uploads/${attDto.img}`, (err) => {
        if (err) {
          console.error(err);
          return;
        }
        //file deleted
      });
    }

    await AttachmentModel.deleteMany({});

    return { message: "All attachments deleted" };
  }
}

module.exports = new AttachmentService();
