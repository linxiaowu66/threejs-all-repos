import "./style.css";

const demos = [
  {
    url: "/three_demo_01",
    tags: ["基础"],
    desc: "基础实例",
    source: "",
  },
  {
    url: "/three_demo_02",
    tags: ["基础"],
    desc: "基础实例",
    source: "",
  },
  {
    url: "/three_demo_04",
    tags: ["基础"],
    desc: "基础实例",
    source: "",
  },
  {
    url: "/three_demo_05",
    tags: ["基础"],
    desc: "基础实例",
    source: "",
  },
  {
    url: "/three_demo_06",
    tags: ["基础"],
    desc: "基础实例",
    source: "",
  },
  {
    url: "/three_demo_07",
    tags: ["基础"],
    desc: "基础实例",
    source: "",
  },
  {
    url: "/three_DirectionalLight_demo",
    tags: ["基础"],
    desc: "基础实例",
    source: "",
  },
  {
    url: "/three_HemisphereLight_demo",
    tags: ["基础"],
    desc: "基础实例",
    source: "",
  },
  {
    url: "/three_RectAreaLight_demo",
    tags: ["基础"],
    desc: "基础实例",
    source: "",
  },
  {
    url: "/three_LensFlare_demo",
    tags: ["基础"],
    desc: "基础实例",
    source: "",
  },
  {
    url: "/three_LineBasicMaterial_demo",
    tags: ["基础"],
    desc: "基础实例",
    source: "",
  },
  {
    url: "/three_LineDashedMaterial_demo",
    tags: ["基础"],
    desc: "基础实例",
    source: "",
  },
  {
    url: "/three_MeshDepthMaterial_demo",
    tags: ["基础"],
    desc: "基础实例",
    source: "",
  },
  {
    url: "/three_MeshLambertMaterial_demo",
    tags: ["基础"],
    desc: "基础实例",
    source: "",
  },
  {
    url: "/three_geometry_demo1",
    tags: ["基础"],
    desc: "基础实例",
    source: "",
  },
  {
    url: "/three_geometry_demo2",
    tags: ["基础"],
    desc: "基础实例",
    source: "",
  },
  {
    url: "/three_sprite_demo1",
    tags: ["基础"],
    desc: "基础实例",
    source: "",
  },
  {
    url: "/three_sprite_demo2",
    tags: ["基础"],
    desc: "基础实例",
    source: "",
  },
  {
    url: "/three_group_demo",
    tags: ["基础"],
    desc: "基础实例",
    source: "",
  },
  {
    url: "/three_geometry_merge_demo",
    tags: ["基础"],
    desc: "基础实例",
    source: "",
  },

  {
    url: "/three_ObjectLoader_demo",
    tags: ["基础"],
    desc: "基础实例",
    source: "",
  },
  {
    url: "/three_ObjLoader_demo",
    tags: ["基础"],
    desc: "基础实例",
    source: "",
  },
  {
    url: "/three_ColladaLoader_demo",
    tags: ["基础"],
    desc: "基础实例",
    source: "",
  },
  {
    url: "/three_GLTFLoader",
    tags: ["基础"],
    desc: "基础实例",
    source: "",
  },
  {
    url: "/three_MMDLoader_demo",
    tags: ["基础"],
    desc: "基础实例",
    source: "",
  },
  {
    url: "/three_PCDLoader_demo",
    tags: ["基础"],
    desc: "基础实例",
    source: "",
  },
  {
    url: "/three_PDBLoader",
    tags: ["基础"],
    desc: "基础实例",
    source: "",
  },
  {
    url: "/three_SVGLoader_demo",
    tags: ["基础"],
    desc: "基础实例",
    source: "",
  },
  {
    url: "/three_PRWMLoader_demo",
    tags: ["基础"],
    desc: "基础实例",
    source: "",
  },
  {
    url: "/three_selectObject_demo",
    tags: ["基础"],
    desc: "基础实例",
    source: "",
  },
  {
    url: "/three_animation_demo",
    tags: ["基础"],
    desc: "基础实例",
    source: "",
  },
  {
    url: "/three_FirstPersonContorls_demo",
    tags: ["基础"],
    desc: "基础实例",
    source: "",
  },
  {
    url: "/three_FlyControls_demo",
    tags: ["基础"],
    desc: "基础实例",
    source: "",
  },
  {
    url: "/three_TrackBallControls_demo",
    tags: ["基础"],
    desc: "基础实例",
    source: "",
  },
  {
    url: "/three_OrbitControls_demo",
    tags: ["基础"],
    desc: "基础实例",
    source: "",
  },
  {
    url: "/three_Texture_demo",
    tags: ["基础"],
    desc: "基础实例",
    source: "",
  },
  {
    url: "/three_city",
    tags: ["基础"],
    desc: "基础实例",
    source: "",
  },
];

function init() {
  const tableInt = document.getElementById("hovertable");

  demos.map((item) => {
    tableInt.innerHTML += `<tr
        onmouseover="this.style.backgroundColor='#ffff66';"
        onmouseout="this.style.backgroundColor='#d4e3e5';"
      >
        <td><a href=${item.url} target="_blank">点我跳转</a></td>
        <td>${item.tags.join(",")}</td>
        <td>${item.desc}</td>
        <td>${item.source}</td>
      </tr>`;
  });
}

init();
