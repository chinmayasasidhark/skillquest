export async function getInternships(skill: string) {
  try {
    const res = await fetch(
      `https://api.adzuna.com/v1/api/jobs/in/search/1?app_id=${import.meta.env.VITE_ADZUNA_APP_ID}&app_key=${import.meta.env.VITE_ADZUNA_API_KEY}&what=${skill}&results_per_page=6`
    );

    const data = await res.json();

    return data.results.map((job: any, i: number) => ({
      id: i,
      title: job.title,
      company: job.company.display_name,
      location: job.location.display_name,
      url: job.redirect_url,
      salary: job.salary_min || "Not specified"
    }));

  } catch (err) {
    console.error(err);

    return [
      {
        id: 1,
        title: "Frontend Intern",
        company: "Demo Company",
        location: "Remote",
        url: "#",
        salary: "N/A"
      }
    ];
  }
}