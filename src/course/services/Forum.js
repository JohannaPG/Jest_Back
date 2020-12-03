// llamamos a la librería

import { httpRequest } from "../../sdk/http/request";
import config from "../config";

export const GetForum = async (forumId, fullResponse = false) => {
  const options = {
    url: `${config.BASE_URL}/forum/${forumId}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    fullResponse
  };
  return httpRequest(options);
};

// Save forum
export const PostCreateForum = async (body, fullResponse = true) => {
  const options = {
    url: `${config.BASE_URL}/forum/save`,
    method: "POST",
    body,
    headers: {
      "Content-Type": "application/json"
    },
    fullResponse
  };
  return httpRequest(options);
};
// Public Forum
export const PostPublicForum = async (body, fullResponse = true) => {
  const options = {
    url: `${config.BASE_URL}/forum/publish`,
    method: "POST",
    body,
    headers: {
      "Content-Type": "application/json"
    },
    fullResponse
  };
  //console.log(options.url)
  return httpRequest(options);
};
export const PostConsultationForum = async (body, fullResponse = true) => {
  const options = {
    url: `${config.BASE_URL}/forum/consultation`,
    method: "POST",
    body,
    headers: {
      "Content-Type": "application/json"
    },
    fullResponse
  };
  //console.log(options.url)
  return httpRequest(options);
};

export const GetFilterForum = async (
  course_id,
  sections_id,
  teacher_id,
  status,
  page,
  fullResponse = false
) => {
  const options = {
    url: `${config.BASE_URL}/internal/courses/${course_id}/sections/${sections_id}/teachers/${teacher_id}/forums/?status=${status}&page=${page}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    fullResponse
  };
  return httpRequest(options);
};

export const GetListForumTeacher = async (
    course_id,
    sections_id,
    teacher_id,
    fullResponse = false
) => {
  const options = {
    url: `${config.BASE_URL}/internal/courses/${course_id}/sections/${sections_id}/teachers/${teacher_id}/forums`,
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    fullResponse
  };
  return httpRequest(options);
};

export const GetForumStudent = async (
  course_id,
  student_id,
  page,
  fullResponse = false
) => {
  const options = {
    url: `${config.BASE_URL}/internal/courses/${course_id}/students/${student_id}/forums/?page=${page}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    fullResponse
  };
  //console.log(options.url)
  return httpRequest(options);
};

export const GetForumStudentSearch = async (
    course_id,
    student_id,
    page,
    title,
    fullResponse = false
) => {
  const options = {
    url: `${config.BASE_URL}/internal/courses/${course_id}/students/${student_id}/forums/?page=${page}&title=${title}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    fullResponse
  };
  //console.log(options.url)
  return httpRequest(options);
};


export const PutChangeReadForum = async (course_id, student_id, reader_Id, fullResponse = true
) => {
  const options = {
    url: `${config.BASE_URL}/internal/courses/${course_id}/students/${student_id}/forums/readers/${reader_Id}/seen`,
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    fullResponse
  };
  return httpRequest(options);
};

export const PostCommentForums = async (course_id,section_id,student_id,forum_id,body, fullResponse = true) => {
  const options = {
    url: `${config.BASE_URL}/internal/courses/${course_id}/sections/${section_id}/students/${student_id}/forums/${forum_id}/comment`,
    method: "POST",
    body,
    headers: {
      "Content-Type": "application/json"
    },
    fullResponse
  };
  //console.log(options.url)
  return httpRequest(options);
};

export const GetForumStudentComment= async (
    course_id,
    sections_id,
    student_id,
    forum_Id,
    fullResponse = false
) => {
  const options = {
    url: `${config.BASE_URL}/internal/courses/${course_id}/sections/${sections_id}/students/${student_id}/forums/${forum_Id}/comment`,
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    fullResponse
  };
  //console.log(options.url)
  return httpRequest(options);
};

export const GetForumCourses = async (sectionId, fullResponse = false) => {
  const options = {
    url: `${config.BASE_URL}/internal/forums/search/?sectionId=${sectionId}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    fullResponse
  };
  return httpRequest(options);
};