/* global
functions, makeRequest,
objects,
*/

/* Constants */

const URL_CREATE_EXCEL_FILE = '/api/excel';
const URL_GET_PATIENTS_EXTENDED = '/api/patients/extended';
const URL_GET_DIAGNOSES_BY_NAMES = '/api/diagnoses/byNames';

/* Variables */

const diagnosisNames = [
  'ПСА',
  'Прихована кров',
  'Рентгенографія молочної залози',
  'Денситометрія',
  'Холестерин',
  'Глюкоза',
  'Ультразвукове дослідження молочної залози',
  'Гінекологічне обстеження'
].map((e) => e.toLowerCase());

/* JQuery */
const $excel = $('.excel');
const $report = $('table#report');

$(document).ready(async () => {
  const patients = [];
  const data = await getDiagnosesByNames(diagnosisNames.join(','));

  if (data.length) {
    data.forEach(({ patient, diagnoses }) => {
      let currentPatient = patients.find((p) => p._id === patient._id);

      if (!currentPatient) {
        currentPatient = {
          ...patient,
          diagnoses: [],
        }

        patients.push(currentPatient);
      }

      currentPatient.diagnoses.push(...diagnoses);
    });
  }

  updateTable(patients);

  $excel
    .on('click', async () => {
      const tableBody = [];
      const tableHeaders = [];

      $report.find('th').each((i, e) => {
        tableHeaders.push($(e).text());
      });

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

        tableBody.push(raw);
      });

      const result = await createExcelFile(tableHeaders, tableBody);
      console.log('result', result);
    });
});

const updateTable = (patients) => {
  let appendStr = '';

  const showDiagnoses = (arr) => {
    return (!arr || !arr.length) ? '' : arr.join('');
  };

  patients.forEach((patient, index) => {
    const birthday = getPrettyDate(patient.birthDate);
    const fullName = `${patient.lastName || ''} ${patient.firstName || ''} ${patient.middleName || ''}`

    const dates = Object.fromEntries(
      diagnosisNames.map((e) => [e, []]),
    );

    if (patient.diagnoses) {
      patient.diagnoses.forEach((d) => {
        diagnosisNames.forEach((n) => {
          if (d.name.toLowerCase().includes(n)) {
            dates[n].push(`
              <a
                title="${d.name}"
                target="_blank"
                href="https://helsi.pro/emk/page/${patient.patientId}/diagnosticReports/view/${d.id}"
              >${getPrettyDate(d.createdAt)}</a>
            `);
          }
        });
      });
    }

    appendStr += `<tr>
      <td class="text-center">${index + 1}</td>
      <td class="text-start">
        <a href="https://helsi.pro/emk/page/${patient.patientId}/diagnosticReports" target="_blank">${fullName}</a>
      </td>
      <td>${birthday}</td>
      <td class="text-center">${patient.phone}</td>
      <td>${showDiagnoses(dates[diagnosisNames[0]])}</td>
      <td>${showDiagnoses(dates[diagnosisNames[1]])}</td>
      <td>${showDiagnoses(dates[diagnosisNames[2]])}</td>
      <td>${showDiagnoses(dates[diagnosisNames[3]])}</td>
      <td>${showDiagnoses(dates[diagnosisNames[4]])}</td>
      <td>${showDiagnoses(dates[diagnosisNames[5]])}</td>
      <td>${showDiagnoses(dates[diagnosisNames[6]])}</td>
      <td>${showDiagnoses(dates[diagnosisNames[7]])}</td>
    </tr>`;
  });

  $report.find('tbody').append(appendStr);
};

const getPrettyDate = (date) => {
  return moment(date).format('DD.MM.YYYY');
};

const getPatientsExtended = async (name) => {
  const response = await makeRequest({
    method: 'GET',
    url: URL_GET_PATIENTS_EXTENDED,
  });

  if (!response) {
    alert('Can not get patients');
    return false;
  }

  return response;
};

const getDiagnosesByNames = async (names) => {
  const response = await makeRequest({
    method: 'POST',
    url: URL_GET_DIAGNOSES_BY_NAMES,
    body: { names },
  });

  if (!response) {
    alert('Can not get diagnoses');
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