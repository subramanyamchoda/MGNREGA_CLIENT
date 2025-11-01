import { saveAs } from 'file-saver';
export async function downloadDistrictPDF(district_code){
  const API = import.meta.env.VITE_API_URL;
  const resp = await fetch(`${API}/report/${district_code}/pdf`);
  if (!resp.ok) throw new Error('Report failed');
  const blob = await resp.blob();
  saveAs(blob, `district_${district_code}.pdf`);
}
