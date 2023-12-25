/* global
functions, makeRequest,
objects,
*/

/* Constants */

const URL_GET_EPISODES = '/api/episodes';
const URL_CREATE_EXCEL_FILE = '/api/excel';

/* Variables */

/* JQuery */
const $excel = $('.excel');
const $report = $('table#report');

$(document).ready(async () => {
  const data = await getEpisodes();
  $('#loading').remove();

  if (data.length) {
    updateTable(data);
  }

  $excel
    .on('click', async () => {
      const tableBody = [];
      const tableHeaders = [];

      $report.find('th').each((i, e) => {
        tableHeaders.push($(e).text());
      });

      tableHeaders.push('Примiтки');

      $report.find('tbody tr').each((i, tr) => {
        const $tr = $(tr);
        const raw = [];

        $tr.find('td').each((i, td) => {
          const $td = $(td);
          const $a = $td.find('a');

          if (!$a.length) {
            const text = $td.text();
            raw.push(text);
          } else {
            const text = [];

            $a.each((i, a) => {
              text.push($(a).text())
            });

            raw.push(text.join(', '));
          }
        });

        raw.push('');
        tableBody.push(raw);
      });

      const result = await createExcelFile(tableHeaders, tableBody);
      console.log('result', result);
    });
});

const updateTable = (data) => {
  let appendStr = '';

  const showEpisodes = (arr) => {
    return (!arr || !arr.length) ? '' : arr.join('');
  };

  data.forEach(({ patient, episodes }, index) => {
    const birthday = getPrettyDate(patient.birthDate);
    const fullName = `${patient.lastName || ''} ${patient.firstName || ''} ${patient.middleName || ''}`

    appendStr += `<tr>
      <td class="text-center">${index + 1}</td>
      <td class="text-start">
        <a href="https://helsi.pro/emk/page/${patient.patientId}/diagnosticReports" target="_blank">${fullName}</a>
      </td>
      <td>${birthday}</td>
      <td class="text-center">${patient.phone}</td>
      <td class="${patient.sex ? 'male' : 'female'}">${patient.sex ? 'Чоловiк' : 'Жiнка'}</td>

      <td>
        <a
          target="_blank"
          href="https://helsi.pro/emk/page/${patient.patientId}/episode/${episodes[0].id}/receptions"
        >${getPrettyDate(episodes[0].createdAt)}</a>
      </td>

      <td>
        <a
          target="_blank"
          href="https://helsi.pro/emk/page/${patient.patientId}/episode/${episodes[0].id}/receptions"
        >${episodes[0].name}</a>
      </td>
    </tr>`;

    episodes.forEach((e, index) => {
      if (index === 0) return;

      appendStr += `<tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td class="${patient.sex ? 'male' : 'female'}"></td>

        <td>
          <a
            target="_blank"
            href="https://helsi.pro/emk/page/${patient.patientId}/episode/${e.id}/receptions"
          >${getPrettyDate(e.createdAt)}</a>
        </td>

        <td>
          <a
            target="_blank"
            href="https://helsi.pro/emk/page/${patient.patientId}/episode/${e.id}/receptions"
          >${e.name}</a>
        </td>
      </tr>`;
    });
  });

  $report.find('tbody').append(appendStr);
};

const getPrettyDate = (date) => {
  return moment(date).format('DD.MM.YYYY');
};

const getEpisodes = async () => {
  const response = await makeRequest({
    method: 'GET',
    url: URL_GET_EPISODES,
  });

  if (!response) {
    alert('Can not get episodes');
    return false;
  }

  return response;
};

const createExcelFile = async (tableHeaders, tableBody) => {
  const response = await fetch(URL_CREATE_EXCEL_FILE, {
    method: 'POST',
    body: JSON.stringify({
      tableBody,
      tableHeaders,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    alert('Cant create exel file');
  }

  const blob = await response.blob();

  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = 'output.xlsx';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  return true;
};
