import { Document, Page, Text, View, StyleSheet, renderToBuffer, Font } from '@react-pdf/renderer';
import React from 'react';
import { AIResults, GiftScores, GiftName } from '@/types/quiz';

// Register fonts (system fallbacks)
Font.registerHyphenationCallback(word => [word]);

const colors = {
  bg: '#0d1220',
  card: '#1a2035',
  accent: '#34C6F4',
  white: '#ffffff',
  muted: '#9ca3af',
  border: '#2a3350',
  lightBg: '#f0f9ff',
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.bg,
    padding: 40,
    fontFamily: 'Helvetica',
    color: colors.white,
  },
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 28,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  brandName: {
    fontSize: 22,
    fontFamily: 'Helvetica-Bold',
    color: colors.white,
  },
  brandTagline: {
    fontSize: 9,
    color: colors.muted,
    marginTop: 2,
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  headerLabel: {
    fontSize: 9,
    color: colors.accent,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  headerTitle: {
    fontSize: 13,
    fontFamily: 'Helvetica-Bold',
    color: colors.white,
  },
  // Section headings
  sectionLabel: {
    fontSize: 8,
    color: colors.accent,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 8,
    marginTop: 20,
  },
  // Gift chart
  chartRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  chartLabel: {
    width: 100,
    fontSize: 9,
    color: colors.muted,
    paddingRight: 8,
  },
  chartLabelTop: {
    width: 100,
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: colors.white,
    paddingRight: 8,
  },
  chartBarBg: {
    flex: 1,
    height: 8,
    backgroundColor: '#2a3350',
    borderRadius: 4,
  },
  chartBarFill: {
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent,
  },
  chartBarFillMuted: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3a4460',
  },
  chartScore: {
    width: 28,
    fontSize: 8,
    color: colors.muted,
    textAlign: 'right',
    paddingLeft: 6,
  },
  chartScoreTop: {
    width: 28,
    fontSize: 8,
    color: colors.accent,
    fontFamily: 'Helvetica-Bold',
    textAlign: 'right',
    paddingLeft: 6,
  },
  // Cards
  card: {
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardAccent: {
    backgroundColor: '#0d2040',
    borderRadius: 8,
    padding: 14,
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: colors.accent,
  },
  // Text styles
  narrativeText: {
    fontSize: 10,
    color: '#d1d5db',
    lineHeight: 1.7,
  },
  giftTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: colors.white,
    marginBottom: 4,
  },
  giftDesc: {
    fontSize: 9,
    color: '#d1d5db',
    lineHeight: 1.6,
  },
  synergyText: {
    fontSize: 9,
    color: '#d1d5db',
    fontFamily: 'Helvetica-Oblique',
    lineHeight: 1.6,
  },
  scriptureRef: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#60b4d8',
    marginBottom: 3,
  },
  scriptureText: {
    fontSize: 9,
    color: '#d1d5db',
    fontFamily: 'Helvetica-Oblique',
    lineHeight: 1.6,
    marginBottom: 10,
  },
  weekTitle: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: colors.white,
    marginBottom: 4,
    marginTop: 10,
  },
  actionItem: {
    fontSize: 9,
    color: '#d1d5db',
    marginBottom: 3,
    paddingLeft: 10,
    lineHeight: 1.5,
  },
  // Footer
  footer: {
    position: 'absolute',
    bottom: 24,
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  footerText: {
    fontSize: 7,
    color: colors.muted,
  },
  pageNum: {
    fontSize: 7,
    color: colors.muted,
  },
});

interface PdfProps {
  firstName: string;
  results: AIResults;
  allScores: GiftScores;
}

function GiftsPdf({ firstName, results, allScores }: PdfProps) {
  const sorted = (Object.entries(allScores) as [GiftName, number][]).sort((a, b) => b[1] - a[1]);
  const maxScore = sorted[0]?.[1] || 1;
  const top3 = new Set(sorted.slice(0, 3).map(([g]) => g));
  const BAR_MAX_WIDTH = 200;

  return (
    <Document title={`${firstName ? `${firstName}'s` : 'Your'} Spiritual Gifts Report`} author="3Nails.ai">
      {/* Page 1: Profile + Narrative + Gifts */}
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.brandName}>3Nails.ai</Text>
            <Text style={styles.brandTagline}>Make Heaven Crowded · findyourgifts.ai</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.headerLabel}>Spiritual Gifts Report</Text>
            <Text style={styles.headerTitle}>{firstName ? `${firstName}'s Profile` : 'Your Profile'}</Text>
          </View>
        </View>

        {/* Gift Chart */}
        <Text style={styles.sectionLabel}>Your Full Gift Profile</Text>
        <View style={styles.card}>
          {sorted.map(([gift, score]) => {
            const isTop = top3.has(gift);
            const barWidth = Math.max(4, (score / maxScore) * BAR_MAX_WIDTH);
            return (
              <View key={gift} style={styles.chartRow}>
                <Text style={isTop ? styles.chartLabelTop : styles.chartLabel}>{gift}</Text>
                <View style={styles.chartBarBg}>
                  <View style={[isTop ? styles.chartBarFill : styles.chartBarFillMuted, { width: barWidth }]} />
                </View>
                <Text style={isTop ? styles.chartScoreTop : styles.chartScore}>{score}</Text>
              </View>
            );
          })}
        </View>

        {/* Narrative */}
        <Text style={styles.sectionLabel}>Your Story</Text>
        <View style={styles.card}>
          <Text style={styles.narrativeText}>{results.narrative}</Text>
        </View>

        {/* Top Gifts */}
        <Text style={styles.sectionLabel}>Your Gifts at Work</Text>
        {results.topGifts.map((g, i) => (
          <View key={i} style={styles.card}>
            <Text style={styles.giftTitle}>{i + 1}. {g.name}</Text>
            <Text style={styles.giftDesc}>{g.description}</Text>
          </View>
        ))}

        {/* Synergy */}
        {results.giftSynergy && (
          <View style={styles.cardAccent}>
            <Text style={styles.synergyText}>{results.giftSynergy}</Text>
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>3Nails.ai · findyourgifts.ai · Make Heaven Crowded</Text>
          <Text style={styles.pageNum} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
        </View>
      </Page>

      {/* Page 2: Shadow Side + Scriptures + Action Plan */}
      <Page size="A4" style={styles.page}>
        {/* Header repeat */}
        <View style={styles.header}>
          <View>
            <Text style={styles.brandName}>3Nails.ai</Text>
            <Text style={styles.brandTagline}>Make Heaven Crowded · findyourgifts.ai</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.headerLabel}>Spiritual Gifts Report</Text>
            <Text style={styles.headerTitle}>{firstName ? `${firstName}'s Profile` : 'Your Profile'}</Text>
          </View>
        </View>

        {/* Shadow Side */}
        <Text style={styles.sectionLabel}>Your Shadow Side</Text>
        <View style={styles.card}>
          <Text style={styles.narrativeText}>{results.shadowSide}</Text>
        </View>

        {/* Scriptures */}
        {results.scriptures?.length > 0 && (
          <>
            <Text style={styles.sectionLabel}>Scriptures for Your Profile</Text>
            <View style={styles.card}>
              {results.scriptures.map((s, i) => (
                <View key={i}>
                  <Text style={styles.scriptureRef}>{s.reference}</Text>
                  <Text style={styles.scriptureText}>{s.text}</Text>
                </View>
              ))}
            </View>
          </>
        )}

        {/* 30-Day Action Plan */}
        {results.actionPlan?.length > 0 && (
          <>
            <Text style={styles.sectionLabel}>Your 30-Day Action Plan</Text>
            <View style={styles.card}>
              {results.actionPlan.map((week) => (
                <View key={week.week}>
                  <Text style={styles.weekTitle}>Week {week.week}: {week.theme}</Text>
                  {week.actions.map((action, i) => (
                    <Text key={i} style={styles.actionItem}>• {action}</Text>
                  ))}
                </View>
              ))}
            </View>
          </>
        )}

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>3Nails.ai · findyourgifts.ai · Make Heaven Crowded</Text>
          <Text style={styles.pageNum} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
        </View>
      </Page>
    </Document>
  );
}

export async function generateGiftsPdf(firstName: string, results: AIResults, allScores: GiftScores): Promise<Buffer> {
  const element = React.createElement(GiftsPdf, { firstName, results, allScores });
  return await renderToBuffer(element as React.ReactElement);
}
