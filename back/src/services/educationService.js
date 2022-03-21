import { Education } from "../db";
import { v4 as uuidv4 } from "uuid";

class educationService {
  static async addEducation({ user_id, school, major, position }) {
    // education 추가
    const existEducation = await Education.findBySchool({ school });
    let isExist = null;
    existEducation.forEach((element) => {
      if (element.user_id === user_id) {
        isExist = true;
        return;
      }
    });

    if (isExist) {
      const errorMessage = "해당 학력은 이미 존재합니다.";
      alert(errorMessage);
      return { errorMessage };
    }

    // education 고유 id 발급
    const id = uuidv4();
    const newEducation = { user_id, id, school, major, position };

    // db에 저장하기
    const createEducation = await Education.create({ newEducation });
    createEducation.errorMessage = null;
    return createEducation;
  }

  static async getEducation({ id }) {
    // education의 id를 기준으로 확인
    const education = await Education.findById({ id });
    return education;
  }

  static async getEducations({ user_id }) {
    // 사용자 id를 기준으로 모든 학력 가져오기
    const educations = await Education.findByUserId({ user_id });
    return educations;
  }

  static async setEducations({ id, updateEducation }) {
    // 학력 id를 기준으로 수정
    let education = await Education.findById({ id });

    if (!education) {
      const errorMessage = "해당 학력이 존재하지 않습니다.";
      return { errorMessage };
    }

    // 업데이트 대상 있는지 확인하기
    if (updateEducation.school) {
      const fieldToUpdate = "school";
      const newValue = updateEducation.school;
      education = await Education.update({ id, fieldToUpdate, newValue });
    }

    if (updateEducation.major) {
      const fieldToUpdate = "major";
      const newValue = updateEducation.major;
      education = await Education.update({ id, fieldToUpdate, newValue });
    }

    if (updateEducation.position) {
      const fieldToUpdate = "position";
      const newValue = updateEducation.position;
      education = await Education.update({ id, fieldToUpdate, newValue });
    }

    return education;
  }
}

export { educationService };
