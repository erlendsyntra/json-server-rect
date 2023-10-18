import randomColor from "randomcolor";
import "/css/style.scss";

async function main() {
  const container = document.querySelector("#container");
  const basePath = "http://localhost:3000/rectangles/";
  render();

  container.ondblclick = async (e) => {
    const id = e.target.dataset.id;
    const response = await fetch(basePath + id, {
      method: "DELETE",
    });
    render();
  };

  container.onclick = async (e) => {
    const id = e.target.dataset.id;
    const response = await fetch(basePath + id, {
      method: "PATCH",
      body: JSON.stringify({
        color: randomColor(),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    e.target.style.backgroundColor = data.color;
    // document.querySelector(`[data-id="${data.id}"]`).style.backgroundColor = data.color;
  };

  async function render() {
    const response = await fetch(basePath);
    const data = await response.json();
    container.innerHTML = data
      .map(({ id, color, width, height, x, y }) => {
        return `<div class="rectangle" data-id="${id}" 
        style="
            background-color:${color}; 
            width:${width}; 
            height:${height}; 
            top:${y}; 
            left:${x}; 
            position:absolute
        ">
        </div>`;
      })
      .join("");
  }
}

main();
