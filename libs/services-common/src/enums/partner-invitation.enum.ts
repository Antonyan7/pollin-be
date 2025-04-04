export enum ContributionEnum {
  Sperm = 'Sperm',
  Egg = 'Egg',
  Uterus = 'Uterus',
  EggUterus = 'EggUterus',

  /** Denied for partnehr invintations  */
  NoBiologicalContribution = 'NoBiologicalContribution',
}

export enum ContributionTitles {
  Sperm = 'Sperm',
  Egg = 'Egg',
  Uterus = 'Uterus',
  EggUterus = 'Egg & Uterus',
  NoBiologicalContribution = 'No biological contribution',
}

export enum RelationshipEnum {
  Married = 'Married',
  CommonLaw = 'CommonLaw',
  Committed = 'Committed',
  Other = 'Other',
}

export enum RelationshipLabel {
  Married = 'Married',
  CommonLaw = 'Common Law',
  Committed = 'Committed Relationship',
  Other = 'Other',
}

export const ContributionTitlesMapper = {
  [ContributionEnum.Sperm]: ContributionTitles.Sperm,
  [ContributionEnum.Egg]: ContributionTitles.Egg,
  [ContributionEnum.Uterus]: ContributionTitles.Uterus,
  [ContributionEnum.EggUterus]: ContributionTitles.EggUterus,
  [ContributionEnum.NoBiologicalContribution]: ContributionTitles.NoBiologicalContribution,
}

export const getRelationshipLabel = new Map<RelationshipEnum, string>([
  [RelationshipEnum.Married, RelationshipLabel.Married],
  [RelationshipEnum.CommonLaw, RelationshipLabel.CommonLaw],
  [RelationshipEnum.Committed, RelationshipLabel.Committed],
  [RelationshipEnum.Other, RelationshipLabel.Other],
])
