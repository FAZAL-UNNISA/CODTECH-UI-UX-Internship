document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const primaryLine = document.getElementById('primaryLine');
  const secondaryLine = document.getElementById('secondaryLine');
  const dataPoint = document.getElementById('dataPoint');
  const guideLine = document.getElementById('guideLine');
  const chartTitle = document.getElementById('chartTitle');
  const chartMetric = document.getElementById('chartMetric');
  const getStartedBtn = document.getElementById('getStartedBtn');

  // Data sets for each tab
  const chartData = {
    payments: {
      title: 'Gross Payment Volume',
      metric: '$1,428,900.00',
      primary: '10,148 100,124 185,120 280,94 370,108 465,86 560,91 650,54 735,34',
      secondary: '10,148 100,134 185,132 280,118 370,128 465,128 560,138 650,131 735,126',
      point: { cx: 370, cy: 108 }
    },
    billing: {
      title: 'Monthly Recurring Revenue (MRR)',
      metric: '$312,450.00',
      primary: '10,142 100,130 185,112 280,102 370,84 465,72 560,58 650,42 735,24',
      secondary: '10,145 100,140 185,135 280,128 370,120 465,115 560,110 650,104 735,98',
      point: { cx: 370, cy: 84 }
    },
    connect: {
      title: 'Connected Platform Payouts',
      metric: '$894,120.00',
      primary: '10,148 100,138 185,105 280,115 370,76 465,92 560,62 650,48 735,28',
      secondary: '10,148 100,142 185,136 280,130 370,122 465,118 560,112 650,108 735,102',
      point: { cx: 370, cy: 76 }
    }
  };

  // Switch active tab and update chart SVG
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const selected = chartData[btn.getAttribute('data-tab')];
      chartTitle.textContent = selected.title;
      chartMetric.textContent = selected.metric;
      primaryLine.setAttribute('points', selected.primary);
      secondaryLine.setAttribute('points', selected.secondary);
      dataPoint.setAttribute('cx', selected.point.cx);
      dataPoint.setAttribute('cy', selected.point.cy);
      guideLine.setAttribute('x1', selected.point.cx);
      guideLine.setAttribute('x2', selected.point.cx);
    });
  });

  // Snap data marker to nearest point when hovering over the chart
  const svgChart = document.getElementById('trendChart');
  svgChart.addEventListener('mousemove', (e) => {
    const rect = svgChart.getBoundingClientRect();
    const scaleX = 740 / rect.width;
    const mouseX = (e.clientX - rect.left) * scaleX;

    const points = primaryLine
      .getAttribute('points')
      .trim()
      .split(' ')
      .map(pair => {
        const [x, y] = pair.split(',').map(Number);
        return { x, y };
      });

    const closest = points.reduce((prev, curr) =>
      Math.abs(curr.x - mouseX) < Math.abs(prev.x - mouseX) ? curr : prev
    );

    dataPoint.setAttribute('cx', closest.x);
    dataPoint.setAttribute('cy', closest.y);
    guideLine.setAttribute('x1', closest.x);
    guideLine.setAttribute('x2', closest.x);
  });

  // CTA Button Action
  getStartedBtn.addEventListener('click', () => {
    document.querySelector('.dashboard-wrapper').scrollIntoView({ behavior: 'smooth' });
  });
});
```[cite: 10, 11]