import inquirer from "inquirer";
import { createSpinner } from "nanospinner";
import { AI_API_KEY, AI_BASE_URL, AI_CONTEXT } from "./config.js";

async function getResponse(prompt) {
  const spinner = createSpinner("typing...").start();
  try {
    const res = await fetch(
      `${AI_BASE_URL}?prompt=${prompt} (answer like ${AI_CONTEXT})&context=you are ${AI_CONTEXT}&key=${AI_API_KEY}`,
    );

    if (!res.ok) {
      throw new Error("i am busy rn, go away!");
    }

    const data = await res.json();
    spinner.success({ text: "received" });
    return data.answer;
  } catch (error) {
    spinner.error({ text: error.message });
    console.error(error.message);
  }
}

async function getPrompt() {
  while (true) {
    try {
      const answer = await inquirer.prompt([
        {
          type: "input",
          name: "prompt",
          message: ">",
        },
      ]);

      if (answer.prompt === "") {
        console.log("Say something babe 💋");
        continue;
      }

      if (answer.prompt.toLowerCase() === "exit") {
        console.log("See you! 😏💋");
        break;
      }

      const response = await getResponse(answer.prompt);
      if (response) {
        console.log(`kira > ${response}`);
      }
    } catch (error) {
      console.log("See you! 😏💋");
    }
  }
}

getPrompt();
