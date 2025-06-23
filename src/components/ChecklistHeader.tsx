
import React from 'react';
import { PageTitle } from './PageTitle';

export const ChecklistHeader = () => {
  return (
    <div className="text-center mb-8">
      <PageTitle>
        🎯 Checklist - Begin Your Journey
      </PageTitle>
      <p className="text-base text-gray-600 max-w-2xl mx-auto font-calibri">
        Complete each module to unlock the next step in your French education journey.
        Earn keys by finishing modules and unlock new opportunities!
      </p>
    </div>
  );
};
