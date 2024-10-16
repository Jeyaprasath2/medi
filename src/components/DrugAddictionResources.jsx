import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from 'lucide-react';

const DrugAddictionResources = () => {
  const resources = [
    {
      title: "National Institute on Drug Abuse",
      url: "https://www.drugabuse.gov/",
      description: "Comprehensive information on drug abuse and addiction."
    },
    {
      title: "Substance Abuse and Mental Health Services Administration",
      url: "https://www.samhsa.gov/",
      description: "Resources for finding treatment and support."
    },
    {
      title: "Narcotics Anonymous",
      url: "https://www.na.org/",
      description: "Support group for individuals recovering from drug addiction."
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <ExternalLink className="mr-2" />
          Drug Addiction Resources
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {resources.map((resource, index) => (
            <li key={index}>
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-semibold"
              >
                {resource.title}
              </a>
              <p className="text-sm text-gray-600">{resource.description}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default DrugAddictionResources;