import ollama
import re

def analyze_drone_trajectory(trajectory_json):
    prompt_template = f"""
    You are an expert in drone trajectory analysis. Analyze the following drone trajectory data and classify the behavior.

    ### Data Description:
    Each data entry consists of:
    - **X-Y Coordinates**: The position of the drone in space.
    - **Speed**: The velocity of the drone.
    - **Confidence**: The certainty of the data provided.
    - **Malicious**: A preliminary classification (if available).

    ### Task:
    1. **Analyze** the given data to determine if the drone is behaving maliciously.
    2. If **malicious**, classify the **Behavior** (e.g., "Suspicious Loitering", "Intrusion Detected").
       - Provide a **Confidence** score (in percentage) for the classification.
       - Explain your **Reasoning** in detail.
    3. If **not malicious**, classify the **Behavior** as "Normal Operation" or another suitable term.
       - Provide a **Confidence** score (in percentage).
       - Explain why it does **not** appear to be malicious.

    ### Input Data:
    {trajectory_json}

    ### Expected Output:
    Respond with:
    - **Behaviour**: The classification of the drone's activity.
    - **Confidence**: The confidence level in percentage (0-100).
    - **Reasoning**: A brief explanation of the classification.

    Format the response as:
    Behaviour: <classification>
    Confidence: <confidence percentage>
    Reasoning: <explanation>
    """

    # Send the prompt to Ollama
    response = ollama.chat(
        model='qwen2.5-coder:1.5b',
        messages=[{'role': 'user', 'content': prompt_template}]
    )

    # Extract model response
    raw_output = response['message']['content'].strip()

    # Initialize the response dictionary
    result = {
        "Behaviour": "",
        "Confidence": 0,
        "Reasoning": ""
    }

    # Manually parse values from the model's response
    for line in raw_output.split("\n"):
        if "Behaviour:" in line:
            result["Behaviour"] = line.split(":", 1)[1].strip()
        elif "Confidence:" in line:
            confidence_match = re.search(r"(\d+)", line)  # Extract first number found
            if confidence_match:
                result["Confidence"] = int(confidence_match.group(1))
        elif "Reasoning:" in line:
            result["Reasoning"] = line.split(":", 1)[1].strip()

    return result

