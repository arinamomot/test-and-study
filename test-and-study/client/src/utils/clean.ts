export default class Clean {
  static async cleanLocalStorage() {
    if (localStorage.getItem("testId")) localStorage.removeItem("testId");
    if (localStorage.getItem("testCreator"))
      localStorage.removeItem("testCreator");
    if (localStorage.getItem("questions")) localStorage.removeItem("questions");
    if (localStorage.getItem("testTopic")) localStorage.removeItem("testTopic");
    if (localStorage.getItem("testTypes")) localStorage.removeItem("testTypes");
    if (localStorage.getItem("test")) localStorage.removeItem("test");
    if (localStorage.getItem("topics")) localStorage.removeItem("topics");
    if (localStorage.getItem("members")) localStorage.removeItem("members");
    if (localStorage.getItem("color")) localStorage.removeItem("color");
    if (localStorage.getItem("preview")) localStorage.removeItem("preview");
    if (localStorage.getItem("changedQuestions"))
      localStorage.removeItem("changedQuestions");
    if (localStorage.getItem("run")) localStorage.removeItem("run");
    if (localStorage.getItem("points")) localStorage.removeItem("points");
    if (localStorage.getItem("maxPoints")) localStorage.removeItem("maxPoints");
    if (localStorage.getItem("userAnswers"))
      localStorage.removeItem("userAnswers");
    if (localStorage.getItem("responseId"))
      localStorage.removeItem("responseId");
    if (localStorage.getItem("timerOver")) localStorage.removeItem("timerOver");
    if (localStorage.getItem("showResponse"))
      localStorage.removeItem("showResponse");
    if (localStorage.getItem("userEmail")) localStorage.removeItem("userEmail");
    if (localStorage.getItem("previewBack"))
      localStorage.removeItem("previewBack");
    if (localStorage.getItem("previewBack"))
      localStorage.removeItem("previewBack");
    if (localStorage.getItem("respPage")) localStorage.removeItem("respPage");
  }
}
