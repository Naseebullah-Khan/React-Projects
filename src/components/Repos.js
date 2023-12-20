import React from "react";
import styled from "styled-components";
import { GithubContext } from "../context/context";
import { Pie3D, Column3D, Bar3D, Doughnut2D } from "./Charts";
const Repos = () => {
  const { githubRepos } = React.useContext(GithubContext);

  const languages = githubRepos.reduce((acc, curr) => {
    if (!curr.language) return acc;
    const { language, stargazers_count } = curr;
    if (!acc[language]) {
      acc[language] = { label: language, value: 1, stars: stargazers_count };
    } else {
      acc[language] = {
        ...acc[language],
        value: acc[language]["value"] + 1,
        stars: acc[language].stars + stargazers_count,
      };
    }
    return acc;
  }, {});

  const mostUsed = Object.values(languages)
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  const mostPopular = Object.values(languages)
    .sort((a, b) => b.stars - a.stars)
    .map((item) => {
      const obj = { ...item, value: item.stars };
      delete obj.stars;
      return obj;
    })
    .slice(0, 5);

  //  My Approach
  // const repos = githubRepos.reduce(
  //   (acc, curr) => {
  //     const { name, stargazers_count, forks } = curr;
  //     acc.mostPopular = [
  //       ...acc.mostPopular,
  //       { label: name, value: stargazers_count },
  //     ];
  //     acc.mostForked = [...acc.mostForked, { label: name, value: forks }];
  //     return acc;
  //   },
  //   { mostPopular: [], mostForked: [] }
  // );

  // Teacher Approach
  let { stars, forks } = githubRepos.reduce(
    (acc, curr) => {
      const { name, stargazers_count, forks } = curr;
      acc.stars[stargazers_count] = { label: name, value: stargazers_count };
      acc.forks[forks] = { label: name, value: forks };
      return acc;
    },
    {
      stars: {},
      forks: {},
    }
  );

  stars = Object.values(stars).slice(-5).reverse();
  forks = Object.values(forks).slice(-5).reverse();

  return (
    <section className="section">
      <Wrapper className="section-center">
        {/* <ExampleChart data={chartData} /> */}
        <Pie3D data={mostUsed} />
        <Column3D data={stars} />
        <Doughnut2D data={mostPopular} />
        <Bar3D data={forks} />
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
