<script>
    import { Chart, Card, Dropdown, DropdownItem } from 'flowbite-svelte';
  
    const options = {
      series: [
        {
          name: 'Income',
          color: '#31C48D',
          data: ['1420', '1620', '1820', '1420', '1650', '2120']
        },
        {
          name: 'Expense',
          data: ['788', '810', '866', '788', '1100', '1200'],
          color: '#F05252'
        }
      ],
      chart: {
        sparkline: {
          enabled: false
        },
        type: 'bar',
        width: '100%',
        height: 400,
        toolbar: {
          show: false
        }
      },
      fill: {
        opacity: 1
      },
      plotOptions: {
        bar: {
          horizontal: true,
          columnWidth: '100%',
          borderRadiusApplication: 'end',
          borderRadius: 6,
          dataLabels: {
            position: 'top'
          }
        }
      },
      legend: {
        show: true,
        position: 'bottom'
      },
      dataLabels: {
        enabled: false
      },
      tooltip: {
        shared: true,
        intersect: false,
        formatter: function (value) {
          return '$' + value;
        }
      },
      xaxis: {
        labels: {
          show: true,
          style: {
            fontFamily: 'Inter, sans-serif',
            cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
          },
          formatter: function (value) {
            return '$' + value;
          }
        },
        categories: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        axisTicks: {
          show: false
        },
        axisBorder: {
          show: false
        }
      },
      yaxis: {
        labels: {
          show: true,
          style: {
            fontFamily: 'Inter, sans-serif',
            cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
          }
        }
      },
      grid: {
        show: true,
        strokeDashArray: 4,
        padding: {
          left: 2,
          right: 2,
          top: -20
        }
      }
    };
  </script>
  
  <Card>
    <div class="flex justify-between border-gray-200 border-b dark:border-gray-700 pb-3">
      <dl>
        <dt class="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">Profit</dt>
        <dd class="leading-none text-3xl font-bold text-gray-900 dark:text-white">$5,405</dd>
      </dl>
    </div>
  
    <div class="grid grid-cols-2 py-3">
      <dl>
        <dt class="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">Income</dt>
        <dd class="leading-none text-xl font-bold text-green-500 dark:text-green-400">$23,635</dd>
      </dl>
      <dl>
        <dt class="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">Expense</dt>
        <dd class="leading-none text-xl font-bold text-red-600 dark:text-red-500">-$18,230</dd>
      </dl>
    </div>
  
    <Chart {options} />
    <div class="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
      <div class="flex justify-between items-center pt-5">
        <Dropdown class="w-40" offset="-6">
          <DropdownItem>Yesterday</DropdownItem>
          <DropdownItem>Today</DropdownItem>
          <DropdownItem>Last 7 days</DropdownItem>
          <DropdownItem>Last 30 days</DropdownItem>
          <DropdownItem>Last 90 days</DropdownItem>
        </Dropdown>
      </div>
    </div>
  </Card>