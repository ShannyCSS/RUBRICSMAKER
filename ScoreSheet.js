import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Download, Trophy, FileText } from 'lucide-react';
import { Document, Packer, Paragraph, Table, TableRow, TableCell, WidthType, AlignmentType, HeadingLevel, TextRun } from 'docx';

const ScoreSheet = ({ scoreSheet }) => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const generateWordDocument = async () => {
    // Create table rows for the score sheet
    const tableRows = [];

    // Header row with criteria
    const headerCells = [
      new TableCell({
        children: [new Paragraph({ text: "Participants", style: "Heading3" })],
        width: { size: 2000, type: WidthType.DXA },
        shading: { fill: "E9ECEF" }
      })
    ];

    // Add criteria columns
    scoreSheet.criteria.forEach(criterion => {
      headerCells.push(
        new TableCell({
          children: [
            new Paragraph({ 
              text: criterion.name,
              alignment: AlignmentType.CENTER
            }),
            new Paragraph({ 
              text: `(Percent/Points)`,
              alignment: AlignmentType.CENTER,
              style: "Caption"
            })
          ],
          width: { size: 1500, type: WidthType.DXA },
          shading: { fill: "F8F9FA" }
        })
      );
    });

    // Add total column
    headerCells.push(
      new TableCell({
        children: [new Paragraph({ text: "Total", alignment: AlignmentType.CENTER })],
        width: { size: 1200, type: WidthType.DXA },
        shading: { fill: "E9ECEF" }
      })
    );

    tableRows.push(new TableRow({ children: headerCells }));

    // Participant rows
    scoreSheet.participants.forEach((participant, index) => {
      const participantCells = [
        new TableCell({
          children: [new Paragraph({ text: participant.name })],
          shading: { fill: index % 2 === 0 ? "FFFFFF" : "F8F9FA" }
        })
      ];

      // Add empty score cells for manual filling
      scoreSheet.criteria.forEach(criterion => {
        participantCells.push(
          new TableCell({
            children: [new Paragraph({ text: "_____", alignment: AlignmentType.CENTER })],
            shading: { fill: index % 2 === 0 ? "FFFFFF" : "F8F9FA" }
          })
        );
      });

      // Add total cell
      participantCells.push(
        new TableCell({
          children: [new Paragraph({ text: "_____", alignment: AlignmentType.CENTER })],
          shading: { fill: index % 2 === 0 ? "FFFFFF" : "F8F9FA" }
        })
      );

      tableRows.push(new TableRow({ children: participantCells }));
    });

    const maxTotal = scoreSheet.criteria.reduce((sum, criterion) => sum + criterion.maxPoints, 0);

    // Create the document
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            text: scoreSheet.rubricTitle,
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER
          }),
          new Paragraph({
            text: scoreSheet.rubricDescription || "",
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 }
          }),
          new Paragraph({
            text: `Generated on: ${scoreSheet.generatedAt}`,
            alignment: AlignmentType.CENTER,
            spacing: { after: 800 }
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: tableRows,
            margins: { top: 400, bottom: 400, left: 400, right: 400 }
          }),
          new Paragraph({
            text: "",
            spacing: { after: 400 }
          }),
          new Paragraph({
            text: "Maximum Points per Criterion:",
            heading: HeadingLevel.HEADING_4
          }),
          ...scoreSheet.criteria.map(criterion => 
            new Paragraph({
              text: `• ${criterion.name}: ${criterion.maxPoints} points`,
              spacing: { after: 200 }
            })
          ),
          new Paragraph({
            text: `Total Maximum Points: ${maxTotal}`,
            heading: HeadingLevel.HEADING_4,
            spacing: { after: 800 }
          }),
          new Paragraph({
            text: "Instructions:",
            heading: HeadingLevel.HEADING_3
          }),
          new Paragraph({
            text: `• Total Participants: ${scoreSheet.participants.length}`,
            spacing: { after: 200 }
          }),
          new Paragraph({
            text: `• Total Criteria: ${scoreSheet.criteria.length}`,
            spacing: { after: 200 }
          }),
          new Paragraph({
            text: `• Maximum Total Points: ${maxTotal}`,
            spacing: { after: 200 }
          }),
          new Paragraph({
            text: "• Fill in the scores for each participant and criterion",
            spacing: { after: 200 }
          }),
          new Paragraph({
            text: "• Calculate totals manually or use a calculator",
            spacing: { after: 200 }
          }),
          new Paragraph({
            text: "• This document can be edited, saved, and printed",
            spacing: { after: 200 }
          })
        ]
      }]
    });

    // Generate and download the document
    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${scoreSheet.rubricTitle.replace(/\s+/g, '_')}_ScoreSheet.docx`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      {/* Score Sheet Header */}
      <div className="card-header">
        <div>
          <h2 style={{ margin: '0', color: '#333' }}>{scoreSheet.rubricTitle}</h2>
          {scoreSheet.rubricDescription && (
            <p style={{ margin: '8px 0 0 0', color: '#666' }}>{scoreSheet.rubricDescription}</p>
          )}
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-secondary" onClick={generateWordDocument}>
            <FileText size={16} />
            Download Word Doc
          </button>
          <button className="btn btn-primary" onClick={handlePrint}>
            <Download size={16} />
            Print Score Sheet
          </button>
        </div>
      </div>

      {/* Score Sheet Content */}
      <div ref={componentRef} style={{ background: 'white', padding: '20px' }}>
        {/* Print Header */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '30px', 
          borderBottom: '2px solid #333',
          paddingBottom: '20px'
        }}>
          <h1 style={{ margin: '0', fontSize: '24px', fontWeight: 'bold' }}>
            <Trophy style={{ display: 'inline', marginRight: '12px' }} />
            {scoreSheet.rubricTitle}
          </h1>
          {scoreSheet.rubricDescription && (
            <p style={{ margin: '10px 0 0 0', fontSize: '14px', color: '#666' }}>
              {scoreSheet.rubricDescription}
            </p>
          )}
          <p style={{ margin: '10px 0 0 0', fontSize: '12px', color: '#999' }}>
            Generated on: {scoreSheet.generatedAt}
          </p>
        </div>

        {/* Competition Score Sheet Template */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse', 
            border: '1px solid #dee2e6',
            fontSize: '14px'
          }}>
            <thead>
              <tr style={{ background: '#f8f9fa' }}>
                {/* Left side - Participants */}
                <th style={{ 
                  padding: '12px', 
                  textAlign: 'left', 
                  border: '1px solid #dee2e6',
                  fontWeight: '600',
                  minWidth: '200px',
                  background: '#e9eceef'
                }}>
                  Participants
                </th>
                
                {/* Criteria across the top */}
                {scoreSheet.criteria.map((criterion, index) => (
                  <th key={criterion.id} style={{ 
                    padding: '12px', 
                    textAlign: 'center', 
                    border: '1px solid #dee2e6',
                    fontWeight: '600',
                    minWidth: '120px',
                    background: '#f8f9fa'
                  }}>
                    {criterion.name}
                    <br />
                    <span style={{ fontSize: '12px', fontWeight: '400', color: '#666' }}>
                      (Percent/Points)
                    </span>
                  </th>
                ))}
                
                {/* Right side - Total */}
                <th style={{ 
                  padding: '12px', 
                  textAlign: 'center', 
                  border: '1px solid #dee2e6',
                  fontWeight: '600',
                  minWidth: '100px',
                  background: '#e9ecef'
                }}>
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Participant Rows */}
              {scoreSheet.participants.map((participant, participantIndex) => (
                <tr key={participant.id} style={{ background: participantIndex % 2 === 0 ? 'white' : '#f8f9fa' }}>
                  {/* Participant name */}
                  <td style={{ 
                    padding: '12px', 
                    border: '1px solid #dee2e6',
                    fontWeight: '500',
                    background: '#f8f9fa'
                  }}>
                    {participant.name}
                  </td>
                  
                  {/* Empty score cells for manual filling */}
                  {scoreSheet.criteria.map((criterion) => (
                    <td key={criterion.id} style={{ 
                      padding: '8px', 
                      textAlign: 'center', 
                      border: '1px solid #dee2e6',
                      height: '40px'
                    }}>
                      {/* Empty cell for manual scoring */}
                    </td>
                  ))}
                  
                  {/* Total score cell */}
                  <td style={{ 
                    padding: '12px', 
                    textAlign: 'center', 
                    border: '1px solid #dee2e6',
                    fontWeight: '600',
                    background: '#f8f9fa',
                    height: '40px'
                  }}>
                    {/* Empty cell for manual total */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Maximum Points Section Below Table */}
        <div style={{ marginTop: '20px', padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
          <h4 style={{ margin: '0 0 15px 0', fontSize: '16px', fontWeight: '600' }}>
            Maximum Points per Criterion:
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
            {scoreSheet.criteria.map((criterion) => (
              <div key={criterion.id} style={{ 
                padding: '8px 12px', 
                background: 'white', 
                borderRadius: '6px',
                border: '1px solid #e9ecef'
              }}>
                <strong>{criterion.name}:</strong> {criterion.maxPoints} points
              </div>
            ))}
          </div>
          <div style={{ marginTop: '15px', padding: '12px', background: '#e9ecef', borderRadius: '6px' }}>
            <strong>Total Maximum Points: {scoreSheet.criteria.reduce((sum, criterion) => sum + criterion.maxPoints, 0)}</strong>
          </div>
        </div>

        {/* Empty State */}
        {scoreSheet.participants.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px', 
            background: '#f8f9fa', 
            borderRadius: '8px',
            border: '2px dashed #dee2e6',
            marginTop: '20px'
          }}>
            <Trophy size={48} style={{ color: '#adb5bd', marginBottom: '16px' }} />
            <p style={{ color: '#6c757d', margin: '0' }}>No participants found. Please add participants in the rubric builder.</p>
          </div>
        )}

        {/* Instructions */}
        {scoreSheet.participants.length > 0 && (
          <div style={{ marginTop: '30px', padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
            <h4 style={{ margin: '0 0 15px 0', fontSize: '16px', fontWeight: '600' }}>
              Word Document Features
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
              <div>
                <strong>Total Participants:</strong> {scoreSheet.participants.length}
              </div>
              <div>
                <strong>Total Criteria:</strong> {scoreSheet.criteria.length}
              </div>
              <div>
                <strong>Maximum Total Points:</strong> {scoreSheet.criteria.reduce((sum, criterion) => sum + criterion.maxPoints, 0)}
              </div>
              <div>
                <strong>Word Document:</strong> Fully editable and printable
              </div>
            </div>
            <div style={{ marginTop: '15px', padding: '12px', background: '#e9ecef', borderRadius: '6px' }}>
              <p style={{ margin: '0', fontSize: '14px', color: '#495057' }}>
                <strong>How to use:</strong> Click "Download Word Doc" to get a .docx file that you can open in Microsoft Word, 
                Google Docs, or any word processor. The document includes the score sheet table with empty cells for manual filling, 
                plus instructions. You can edit, save, and print the document as needed.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScoreSheet; 