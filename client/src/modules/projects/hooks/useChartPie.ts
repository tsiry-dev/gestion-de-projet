import { TaskStatus } from "@/modules/tasks/type";

const useChartPie = (tasks: any[] = []) => {

  const todo = tasks.filter(
    (task) => task.status === TaskStatus.TODO
  ).length;

  const inProgress = tasks.filter(
    (task) => task.status === TaskStatus.IN_PROGRESS
  ).length;

  const done = tasks.filter(
    (task) => task.status === TaskStatus.DONE
  ).length;

  const inReview = tasks.filter(
    (task) => task.status === TaskStatus.IN_REVIEW
  ).length;

  const cancelled = tasks.filter(
    (task) => task.status === TaskStatus.CANCELLED
  ).length;


  const chartData = [
    {
      value: todo,
      name: "À faire",
      itemStyle: {
        color: "#d1d5db", // gray-300
      },
    },

    {
      value: inProgress,
      name: "En cours",
      itemStyle: {
        color: "#93c5fd", // blue-300
      },
    },

    {
      value: inReview,
      name: "En revue",
      itemStyle: {
        color: "#fde047", // yellow-300
      },
    },

    {
      value: done,
      name: "Terminées",
      itemStyle: {
        color: "#86efac", // green-300
      },
    },

    {
      value: cancelled,
      name: "Annulées",
      itemStyle: {
        color: "#fca5a5", // red-300
      },
    },
  ];


  const chartOption = {

    tooltip: {
      trigger: "item",

      formatter: (params: any) => {
        return `
          <div>
            <strong>${params.name}</strong>
            <br/>
            ${params.value} tâche(s)
            <br/>
            ${params.percent}%
          </div>
        `;
      },
    },


    legend: {
      top: "5%",
      left: "center",
    },


    series: [
      {
        name: "Statistiques",

        type: "pie",

        radius: [
          "40%",
          "70%"
        ],


        avoidLabelOverlap: false,


        // Affichage permanent du %
        label: {
          show: true,

          position: "inside",

          formatter: (params: any) => {

            if(params.value === 0){
              return "";
            }

            return `${Math.round(params.percent)}%`;
          },

          fontSize: 10,

          fontWeight: "bold",

          color: "#374151",
        },


        // Affichage au hover
        emphasis: {

          label: {
            show: true,

            fontSize: 15,

            fontWeight: "normal",

            formatter: (params: any) => {
              return `${params.value} tâche(s)`;
            },
          },
        },


        labelLine: {
          show: false,
        },


        data: chartData,
      },
    ],
  };


  return {
    chartOption,
  };
};


export default useChartPie;